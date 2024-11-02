/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";


const userServices = {
    getAllUsers: () => instance.get('/api/user'),
};

export default userServices;