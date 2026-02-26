import React from 'react';
import { Product } from '@/types/mlm';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button asChild variant="secondary" size="icon" className="rounded-full">
            <Link to={`/shop/${product.id}`}><Eye size={18} /></Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
            {product.category}
          </span>
          <span className="text-xs text-gray-400">Stock: {product.stock}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-indigo-600">₹{product.distributor_price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.retail_price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full rounded-xl bg-gray-900 hover:bg-indigo-600 transition-colors gap-2"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;