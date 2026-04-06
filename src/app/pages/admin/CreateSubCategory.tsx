import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import {
  ArrowRight,
  FileText,
  FileType,
} from 'lucide-react';
import axios from "axios";

// Event form data
type EventFormData = {
  name: string;
  image: string;
  desc: string,
  meta_title: string,
  meta_desc: string,
  meta_keywords: string,
  meta_author: string,
};

export const CreateSubCategory: React.FC = () => {

  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm<EventFormData>();


  // Form submission
  const onSubmit = async (data: EventFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("meta_title", data.meta_title);
      formData.append("meta_desc", data.meta_desc);
      formData.append("meta_keywords", data.meta_keywords);
      formData.append("meta_author", data.meta_author);

      // 👇 important: file input
      formData.append("image", data.image[0]);

      const res = await axios.post("http://localhost:5000/api/admin/create-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", res.data);

    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Render step content
  

   return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#16232A] mb-2">Sub-Category Details</h2>
        <p className="text-[#16232A]/70">
          Provide the essential information about sub-category
        </p>
      </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 mb-8">
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Name <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('name', { required: 'Sub-category name is required' })}
                type="text"
                placeholder="e.g., Wedding/Photography"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Category Image */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Image <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <FileType className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('image', { required: 'Category image is required' })}
                type="file"
                // placeholder=""
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>
            {/* Category Description */}
        <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Description <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              {/* <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
              <textarea className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]" id="desc" {...register('desc', { required: 'Description is required' })} placeholder='Please enter description'></textarea>
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
        <h2>Meta Tags</h2>
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Meta Title <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('meta_title', { required: 'Category name is required' })}
                type="text"
                placeholder="Meta Title"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Meta Description <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('meta_desc', { required: 'Category image is required' })}
                type="text"
                placeholder="Meta Description"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Meta Keywords <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('meta_keywords', { required: 'Category name is required' })}
                type="text"
                placeholder="Meta Keywords"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-[#16232A] mb-2">
              Meta Author <span className="text-[#FF5B04]">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('meta_author', { required: 'Category image is required' })}
                type="text"
                placeholder="e.g., Wedding & Photography"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B04]"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>
        
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white"
        >
          Save
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
    </div>
  );
};