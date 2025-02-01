export default class CarsController{
    private request;

    constructor (request){
        this.request = request;
    }

    async addCarWithInputData(brand:number, model: number, mileage: number, cookies: string){
        const response = await this.request.post(`api/cars/`,{
            data: {
                "carBrandId": brand,
                "carModelId": model,
                "mileage": mileage
            },
            headers: {
                'Cookie': `sid=${cookies}`
            }
        });
        return await response.json();
    }

    async getUserCars(cookies: string){
        const response = await this.request.get('api/cars',{
            headers: {
                'Cookie': `sid=${cookies}`
            }
        })
        return await response.json();
    }

    async deleteCarWithId(id: number, cookies: string){
        const response = await this.request.delete(`/api/cars/${id}`,{
            headers: {
                'Cookie': `sid=${cookies}`
            }
        });
        return await response.json();
    }
}