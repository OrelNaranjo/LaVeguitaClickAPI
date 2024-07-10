import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../../../shared/modules/city/entities/city.entity';
import { Commune } from '../../../shared/modules/commune/entities/commune.entity';
import { Country } from '../../../shared/modules/country/entities/country.entity';
import { Region } from '../../../shared/modules/region/entities/region.entity';
import { Account } from '../../modules/auth/account/entity/account.entity';
import { Privilege } from '../../modules/auth/privilege/entities/privilege.entity';
import { Role } from '../../modules/auth/role/entities/role.entity';
import { Category } from '../../modules/production/category/entities/category.entity';
import { Product } from '../../modules/production/product/entities/product.entity';
import { Stock } from '../../modules/production/stock/entities/stock.entity';
import { Warehouse } from '../../modules/production/warehouse/entities/warehouse.entity';
import { Supplier } from '../../modules/purchases/supplier/entities/supplier.entity';
import { Employee } from '../../modules/staff/employee/entities/employee.entity';
import { privileges, roles, accounts } from './data-seeder/account.data';
import { cities } from './data-seeder/city.data';
import { communes } from './data-seeder/commune.data';
import { countries } from './data-seeder/country.data';
import { regions } from './data-seeder/region.data';
import { suppliers, employees, categories, products, warehouses, stocks, customers } from './data-seeder/test.data';
import { Customer } from '../../modules/sales/customer/entities/customer.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Commune)
    private communeRepository: Repository<Commune>,
    @InjectRepository(Privilege)
    private privilegeRepository: Repository<Privilege>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async seed(): Promise<void> {
    const count = await this.accountRepository.count();
    if (count === 0) {
      await this.privilegeRepository.save(privileges);
      await this.roleRepository.save(roles);
      await this.accountRepository.save(accounts);

      await this.countryRepository.insert(countries);
      await this.regionRepository.insert(regions);
      await this.cityRepository.insert(cities);
      await this.communeRepository.insert(communes);

      await this.supplierRepository.save(suppliers);
      await this.employeeRepository.save(employees);
      await this.categoryRepository.save(categories);
      await this.productRepository.save(products);
      await this.warehouseRepository.save(warehouses);
      await this.stockRepository.save(stocks);
      await this.customerRepository.save(customers);
    }
  }
}
