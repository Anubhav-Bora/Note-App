const {v4:uuidv4} = require('uuid');

class Note{
    constructor(title, content, tags=[]){
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
    
    static validateNote(data){
        const {title, content} = data;
        
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return { valid: false, message: 'Title is required and must be a string' };
        }
        
        if (!content || typeof content !== 'string' || content.trim() === '') {
            return { valid: false, message: 'Content is required and must be a string' };
        }
        
        // Check for reasonable length limits
        if (title.trim().length > 200) {
            return { valid: false, message: 'Title must be less than 200 characters' };
        }
        
        if (content.trim().length > 10000) {
            return { valid: false, message: 'Content must be less than 10,000 characters' };
        }
        
        return { valid: true };  
    }
    
    update(data) {
        if (data.title !== undefined) this.title = data.title;
        if (data.content !== undefined) this.content = data.content;
        if (data.tags !== undefined) this.tags = data.tags;
        this.updatedAt = new Date().toISOString();
    }
    
    toJSON(){
        return{
            id: this.id,
            title: this.title,
            content: this.content,
            tags: this.tags,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}

module.exports = Note;