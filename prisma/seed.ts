const { PrismaClient } = require('@prisma/client')
const { categories } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
   
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

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()