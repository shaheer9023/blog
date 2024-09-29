import { defineField, defineType } from 'sanity'  

export const blogType = defineType({  
  name: 'blog',  
  title: 'My Blog',  
  type: 'document',  
  fields: [  
    defineField({  
      name: 'name',  
      type: 'string',  
    }),  
    defineField({  
      name: 'description',  
      type: 'string',  
    }),  
    defineField({  
      name: 'image',  
      type: 'image',  
    }),
    // If you want to add more fields, you can do them here  
  ],  
})