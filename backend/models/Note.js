const {v4:uuidv4} = require('uuid');
class Note{
    constructor(title,content,tags=[]){
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdAt = new Date().toISOString(); 
}
    static validateNote(data){
        const {title,content}=data;
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return { valid: false, message: 'Title is required and must be a string' };
          }
          if (!content || typeof content !== 'string' || content.trim() === '') {
            return { valid: false, message: 'Content is required and must be a string' };
          }
          
          return { valid: true };  
    }
     toJSON(){
        return{
            id:this.id,
            title:this.title,
            content:this.content,
            tags:this.tags,
            createdAt:this.createdAt
        }
    }
}
module.exports = Note;