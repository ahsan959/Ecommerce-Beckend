// this for search and Filtering
class ApiFeatues {
  constructor(query, queryStr) {
    // what is queryStr and query
    // hum koi product search karta ha keyword = productName ata ha this is query ure product name
    // query str may jata ha

    this.query = query;
    this.queryStr = queryStr;
  }

  // create api Search Feature
  search() {
    // terynary Operator to check product is found or Not if found execute first Condition if not found Excute the Second Condition
    const keyword = this.queryStr.keyword
      ? {
          // Search is tarha kara ga ka Example agar ram likha tu ram start may ha end may ha middle may ha Mujha la kar da ga
          name: {
            // use regex Operator MongoDb for pattern
            $regex: this.queryStr.keyword,
            // i means case insensetive Example agar may na ABC Search kia tu wo small agar ha wo b la kar day ga
            $options: "i",
          },
        }
      : {};

    console.log(keyword);

    // we use ... means they Accept any Nummber of Argument
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // in filter time change some thing create copy of queryStr and change it and use ... for passing the Object
    // if we pass this.querystr this will pass refrence not create Object
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);
    // Purpose if we write Iphone it show iphone and remove all the products
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for Price and Ratings
    // we use stringify to Convert into String
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  // we perform Pagenation which and number of product we showing in one page

  pagination(resultPerPage) {
    // any type of product we search this is Query Str
    // wo b query str may likhta ha mil jata ha asha hi 1 kara ga page mila ga
    // query str is a String we Convert into Number
    const currentPage = Number(this.queryStr.page) || 1;

    // product ko skip karna ha agar pahla page ha koi skip ni kara ga toshra ha 50 product 50-10 remove starting 10
    // and third page remove starting 20
    // page 1 . 10*(1-1)-->0
    // page 2 . 10*(2-1)-->10
    //page 3  .10*(3-1)--->20 product remove
    const skip = resultPerPage * (currentPage - 1);

    // we provide Limit and skip values
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
module.exports = ApiFeatues;
