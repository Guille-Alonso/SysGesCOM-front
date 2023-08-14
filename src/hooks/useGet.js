import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGet = (url, axios) => {
  
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      setState(data.data || data);
      setLoading(false);
    } catch (error) {
      toast.error("Error en la conexión");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return [state, loading, getData,setState];
};

export default useGet;