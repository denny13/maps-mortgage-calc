"use server";

export type State = {
      status: "success";
      message: string;
    }

export async function getPrice(data: FormData) {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("server action", data);
  
//   return {
    
//     message: `Welcome, ${data.get("price")}`,
//   };
}