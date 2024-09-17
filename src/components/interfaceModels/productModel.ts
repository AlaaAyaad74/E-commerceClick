interface ICategory {
  id: number;
  name: string;
  image: string;
  updatedAt: string;
  creationAt: string;
}
export interface productModel {
  id: number;
  category: ICategory;
  title: string;
  description: string;
  price: number;
  creationAt: string;
  updatedAt: string;
  images: string[];
  quantity:number
}


