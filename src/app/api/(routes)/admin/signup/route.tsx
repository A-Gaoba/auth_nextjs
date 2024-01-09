import { connect } from "@/dbConfig/db"
import Student from "@/models/studentModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function post(request: NextRequest) {
  try {
    const stuedent = await request.json()
    const { name, email, password } = stuedent
    console.log(stuedent)

    // check if student already exist
    let existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return new Response("User with this email already exists", { status: 409 })
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt)

    const newStuednt = new Student({
      name,
      email,
      password: hashPassword
    })
    const savedStudent = await newStuednt.save()
    console.log(savedStudent)

    return NextResponse.json({
      message: "Student successfully created",
      success: true,
      data: savedStudent,
    })

  } catch (error: any) {
    return new Response("Error in server", { status: 500 })

  }

}