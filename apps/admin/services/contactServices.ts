import api from "@/lib/axios";

export const getContacts = async () => {
  try {
    const response = await api.get("/admin/contacts");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
