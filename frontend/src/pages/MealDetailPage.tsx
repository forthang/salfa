import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMealStore } from '../store/mealStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const mealEditSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  thumbnail: z
    .instanceof(FileList)
    .optional()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type MealEditFormData = z.infer<typeof mealEditSchema>;

const MealDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { meals, fetchMeals, loading, updateMeal } = useMealStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const meal = meals.find((m) => m.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MealEditFormData>({
    resolver: zodResolver(mealEditSchema),
    defaultValues: {
      title: meal?.title,
      description: meal?.description,
    }
  });

  useEffect(() => {
    if (!meal && !loading) {
      fetchMeals();
    }
    reset({
      title: meal?.title,
      description: meal?.description,
    });
  }, [meal, loading, fetchMeals, reset]);

  const handleEditSubmit = (data: MealEditFormData) => {
    const file = data.thumbnail?.[0];

    const performUpdate = (thumbnailUrl?: string) => {
      if (id) {
        const updateData: Partial<any> = {
          title: data.title,
          description: data.description,
        };
        if (thumbnailUrl) {
          updateData.thumbnail = thumbnailUrl;
        }
        updateMeal(id, updateData);
      }
      setIsEditing(false);
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        performUpdate(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      performUpdate();
    }
  };

  if (loading && !meal) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-4">Meal not found</h2>
        <button onClick={() => navigate('/products')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Back to Meals List
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/products')} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300">
          &larr; Back to Meals
        </button>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input id="title" {...register('title')} className="mt-1 block w-full px-3 py-2 border rounded-md"/>
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea id="description" rows={6} {...register('description')} className="mt-1 block w-full px-3 py-2 border rounded-md"/>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium">Change Cover Image</label>
            <input id="thumbnail" type="file" accept="image/*" {...register('thumbnail')} className="mt-1 block w-full text-sm"/>
            {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message as string}</p>}
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <img src={meal.thumbnail} alt={meal.title} className="w-full h-96 object-cover" />
          <div className="p-6">
            <h1 className="font-bold text-3xl mb-4">{meal.title}</h1>
            <h2 className="font-semibold text-xl mb-2">Instructions</h2>
            <p className="text-gray-700 text-base whitespace-pre-wrap">{meal.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetailPage;
