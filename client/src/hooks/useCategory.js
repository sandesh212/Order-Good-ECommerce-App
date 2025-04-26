import axios from "axios";
import { useState,useEffect } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get all category
    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/category/`);
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return categories;
}
