'use server';

import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import {db} from "@/db";
import {FormActionState} from "@/features/shared/form/form-action-state";
import {bucketsTable} from "@/db/schema";

export default async function createBucketAction(previousState: unknown, formData: FormData): Promise<FormActionState> {
    const bucketName = formData.get('name')?.toString();

    const fieldErrors: Record<string, string> = {}

    if (!bucketName || bucketName.length < 3) {
        fieldErrors['name'] = 'Please enter valid name';
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors, formData, status: 'error' };
    }

    const userId = await getUserIdFromHeader();

    await db.insert(bucketsTable).values({
        name: bucketName || '',
        userId: userId
    })

    return {
        status: 'success',
        message: 'Bucket created',
    }
}
