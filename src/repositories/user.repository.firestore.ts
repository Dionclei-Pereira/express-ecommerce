import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { IUserRepository } from "./interfaces/user.repository.interface";
export class UserRepositoryFirestore implements IUserRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('users');
    }

    async findAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];
    }

    async findById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            let user = {
                id: id,
                ...doc.data()
            } as User;

            return user;
        } else {
            return null;
        }
    }

    async save(user: User): Promise<void> {
        const docRef = await this.collection.doc(user.id).set(user);
    }

    async update(user: User): Promise<void> {
        const docRef = await this.collection.doc(user.id);

        docRef.set({
            name: user.name,
            email: user.email
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }

    async exist(id: string): Promise<boolean> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return true;
        }
        return false;
    }
}