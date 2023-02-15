import { useState } from "react";

export const useFetching = (callback: ()=> any) =>{

    const [isLoading, setIsLoading] = useState<any>(false);
    const [errors, setErrors] = useState<string>('');

    const fetching = async () =>{

        try{
            setIsLoading(true)
            await callback();
        }
        
        catch(e: any){
            setErrors(e.message)
        }

        finally{
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, errors]
}