import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  // private products = [];

  // getAll() {
  //   return this.products;
  // }

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // getById(id: number) {
  //   return this.products.find(p => p.id === id);
  // }

  async getById(id: number): Promise<Product> {
    return this.productModel.findById(id);
  }

  // create(productDto: CreateProductDto) {
  //   return this.products.push({
  //     ...productDto,
  //     id: Date.now().toString(),
  //   });
  // }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
