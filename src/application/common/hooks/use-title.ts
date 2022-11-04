import React,{useEffect} from "react";
import { useOutletContext } from "react-router-dom";

export const useTitle = (title:string) => {


  const { setTitle } = useOutletContext() as any;

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
};

export const useBreadcrumbs = (lista:Array<string>)=>{

  const { setBreadcrumbs } = useOutletContext() as any;

  useEffect(() => {
    setBreadcrumbs(lista);
  }, [setBreadcrumbs, lista]);
}
