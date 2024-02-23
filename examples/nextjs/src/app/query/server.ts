"use server"
export async function runsOnServer() {
    console.log("This runs on the server")
    return [
        "john",
        "paul",
        "george",
        "ringo"

    ]
}