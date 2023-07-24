import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from 'apps/projects/src/entities/project.entity';
import { User } from 'apps/users/src/entities/user.entity';

export const mysqlConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username : 'root',
    password : 'Enes2002',
    database : 'basecamp',
    entities: [Project, User],
    synchronize: true,
};

export default mysqlConfig;