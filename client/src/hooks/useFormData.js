import { useState } from "react";

export function useFormData({ initialValue = {} }) {
  const [formData, setFormData] = useState({ ...initialValue });

  const appendFormData = (data) =>
    setFormData((_formData) => ({ ..._formData, ...data }));

  return {
    formData,
    setFormData,
    appendFormData,
  };
}

export default useFormData;
