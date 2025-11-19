import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMealStore, type Meal } from '../../store/mealStore';

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

interface MealEditFormProps {
  meal: Meal;
  onSave: () => void;
  onCancel: () => void;
}

const MealEditForm = ({ meal, onSave, onCancel }: MealEditFormProps) => {
  const { updateMeal } = useMealStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MealEditFormData>({
    resolver: zodResolver(mealEditSchema),
    defaultValues: {
      title: meal.title,
      description: meal.description,
    }
  });

  const handleEditSubmit = (data: MealEditFormData) => {
    const file = data.thumbnail?.[0];

    const performUpdate = (thumbnailUrl?: string) => {
      const updateData: Partial<Omit<Meal, 'id'>> = {
        title: data.title,
        description: data.description,
      };
      if (thumbnailUrl) {
        updateData.thumbnail = thumbnailUrl;
      }
      updateMeal(meal.id, updateData);
      onSave();
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

  return (
    <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input id="title" {...register('title')} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea id="description" rows={6} {...register('description')} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium">Change Cover Image</label>
        <input id="thumbnail" type="file" accept="image/*" {...register('thumbnail')} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message as string}</p>}
      </div>
      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={onCancel} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MealEditForm;
