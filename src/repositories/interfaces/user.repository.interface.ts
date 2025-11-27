import { User } from "../../models/user.model";

export interface IUserRepository {

    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>
    exist(id: string): Promise<boolean>;
}