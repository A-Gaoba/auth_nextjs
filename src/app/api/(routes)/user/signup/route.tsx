import { connect } from "@/dbConfig/db"
import Student from "@/models/studentModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
const jwt = require("jsonwebtoken")

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { name, email, password } = reqBody
    console.log(reqBody)

    // check if student already exist
    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return NextResponse.json({ error: "student already exist" }, { status: 400 })
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
      savedStudent
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })

  }

}