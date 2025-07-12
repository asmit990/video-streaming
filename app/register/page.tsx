"use client"

import { useRouter } from "next/router";
import React from "react";

import { useState } from "react";
function RegisterPage() {
const [ email, setEmail] = useState("")
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const  router = useRouter();
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
if(password !== confirmPassword){
    alert("password dont matchs");
    return ;

}

try {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        he
    })
}
}
}


export default RegisterPage;