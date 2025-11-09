import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { UserRepositoryFirestore } from "../repositories/user.repository.firestore";

export class UserService {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepositoryFirestore();
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }

    async save(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async update(id: string, user: User): Promise<void> {

        const _user = await this.userRepository.findById(id);

        if (!_user) {
            throw new NotFoundError('User not found')
        }

        _user.email = user.email;
        _user.name = user.name;

        this.userRepository.update(_user);
    }

    async delete(id: string): Promise<void> {
        this.userRepository.delete(id);
    }
}