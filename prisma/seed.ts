const { PrismaClient } = require('@prisma/client')
const { categories } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.borrow.deleteMany()
    await prisma.book.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    await prisma.user.create({
      data:{
        id: 1
      } 
    })

    await prisma.user.create({
      data:{
        id: 2
      } 
    })

    // CREATEMANY nto supported for sqlite!!
    await prisma.category.create({
      data:{
        name: 'BD'
      } 
    })
    await prisma.category.create({
      data:{
        name: 'Roman'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Cuisine'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Maison'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Développement personnel'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'Entreprise et bourse'
      } 
    })

   const catInfo =  await prisma.category.create({
      data:{
        name: 'Informatique'
      } 
    })

    const catEnfant = await prisma.category.create({
      data:{
        name: 'Enfant'
      } 
    })

    await prisma.category.create({
      data:{
        name: 'English'
      } 
    })

    const catEnglish = await prisma.category.create({
      data:{
        name: 'English'
      } 
    })

    await prisma.book.create({
      data:{
        title: "english-book",
        author: "auth",
        user:{
          connect: {
            id: 1
          }
        },
        category:{
          connect: {
            id: catEnglish.id
          }
        }        
      } 
    })

    await prisma.book.create({
      data:{
        title: "enfant-book",
        author: "auth2",
        user:{
          connect: {
            id: 1
          }
        },
        category:{
          connect: {
            id: catEnfant.id
          }
        }        
      } 
    })

    await prisma.book.create({
      data:{
        title: "info-book",
        author: "auth3",
        user:{
          connect: {
            id: 1
          }
        },
        category:{
          connect: {
            id: catInfo.id
          }
        }        
      } 
    })




  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()