import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  DataSnapshot,
  get,
  push,
  ref,
  set,
  update,
  remove,
} from 'firebase/database';
import { firebaseDatabase } from 'src/firebase.config';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly dataRef = ref(firebaseDatabase, 'Shoes');

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProductRef = push(this.dataRef);
    try {
      await set(newProductRef, createProductDto);
      console.log('Create Data successful');
      return { id: newProductRef.key, ...createProductDto };
    } catch (e) {
      console.error('Error creating product:', e);
      throw new Error('Could not create product');
    }
  }

  async findAll(order: 'asc' | 'desc' = 'asc'): Promise<Product[]> {
    try {
      const snapshot: DataSnapshot = await get(this.dataRef);
      if (!snapshot.exists()) {
        return [];
      }
      console.log('Retrieve data successful');
      const products = snapshot.val();

      const productList = Object.keys(products).map((key) => ({
        id: key,
        ...products[key],
      }));

      productList.sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      });

      return productList;
    } catch (e) {
      console.error('Error retrieving products:', e);
      throw new Error('Could not retrieve products');
    }
  }

  async findOne(id: string): Promise<Product> {
    const productRef = ref(firebaseDatabase, `Shoes/${id}`);
    try {
      const snapshot: DataSnapshot = await get(productRef);
      if (!snapshot.exists()) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      console.log('Retrieve single product successful');
      return { id, ...snapshot.val() };
    } catch (e) {
      console.error('Error retrieving product:', e);
      throw new Error('Could not retrieve product');
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productRef = ref(firebaseDatabase, `Shoes/${id}`);

    try {
      await update(productRef, updateProductDto);
      console.log('Update product successful');
      return this.findOne(id);
    } catch (e) {
      console.error('Error updating product:', e);
      throw new Error('Could not update product');
    }
  }

  async remove(id: string): Promise<void> {
    const productRef = ref(firebaseDatabase, `Shoes/${id}`);
    try {
      await remove(productRef);
      console.log('Remove product successful');
    } catch (e) {
      console.error('Error removing product:', e);
      throw new Error('Could not remove product');
    }
  }
}
