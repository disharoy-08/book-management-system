User {
  _id: ObjectId,
  username: String,      
  password: String,      
}

Book {
  _id: ObjectId,
  title: String,                         
  author: String,                       
  genre: String,                         
  reviews: [ObjectId],                   
}

Review {
  _id: ObjectId,
  user: ObjectId,        
  book: ObjectId,        
  rating: Number,        
  comment: String,      
  createdAt: Date,
  updatedAt: Date
}
