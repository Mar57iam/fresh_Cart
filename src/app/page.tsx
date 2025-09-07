
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import Home from "./(Products)/products/page";
import MainSlider from "@/_Components/MainSlider/MainSlider";

export default async function page () {
   const cookiesStore = await cookies();

  if (!cookiesStore.get("token")) {
    redirect('/login');
  }

 

  
  return (
    <>
    <MainSlider/>
    <Home/>
    </>
  );
}
