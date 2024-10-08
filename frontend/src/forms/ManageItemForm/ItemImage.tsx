import { useFormContext } from "react-hook-form";
import { ItemFormData } from "./manageItemForm"; // Ensure you have the correct import for ItemFormData

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<ItemFormData>();

    const existingImageUrls = watch("imagesUrl"); // Updated to match the new field name

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        setValue("imagesUrl", existingImageUrls.filter((url) => url !== imageUrl)); // Updated to match the new field name
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && existingImageUrls.length > 0 && ( // Check for existing images
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div key={url} className="relative group">
                                <img src={url} alt="" className="min-h-full object-cover" />
                                <button
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                            
                            if (totalLength === 0) {
                                return "At least one image should be added";
                            }
                            if (totalLength > 6) {
                                return "Total number of images cannot be more than 6";
                            }
                            return true;
                        },
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
    );
};

export default ImagesSection;
