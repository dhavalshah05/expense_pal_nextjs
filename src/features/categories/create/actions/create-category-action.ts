'use server';

import {CreateCategoryActionState} from "@/features/categories/create/actions/create-category-action-state";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {db} from "@/db";
import {categoriesTable} from "@/db/schema";

export default async function createCategoryAction(previousState: unknown, formData: FormData): Promise<CreateCategoryActionState> {
    const categoryName = formData.get('name')?.toString();

    const fieldErrors: Record<string, string> = {}

    if (!categoryName || categoryName.length < 3) {
        fieldErrors['name'] = 'Please enter valid name';
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors, formData, status: 'error' };
    }

    const userId = await getUserIdFromHeader();

    await db.insert(categoriesTable).values({
        name: categoryName || '',
        userId: userId
    })

    return {
        status: 'success',
        message: 'Category created',
    }
}
