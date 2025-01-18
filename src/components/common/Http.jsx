export const apiUrl = "http://localhost:8000/api/"


export const token = () => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      const data = JSON.parse(adminInfo);
      return data?.token;
    }
    return null; 
  };
  

