import { SetMetadata } from '@nestjs/common';
import { GetPrivileges } from './app.decorator';

jest.mock('@nestjs/common', () => ({
    ...jest.requireActual('@nestjs/common'),
    SetMetadata: jest.fn(),
}));

describe('App Decorators', () => {
    describe('GetPrivileges', () => {
        it('should call SetMetadata with the correct arguments', () => {
            GetPrivileges('privilege1', 'privilege2');

            expect(SetMetadata).toHaveBeenCalledWith('privileges', ['privilege1', 'privilege2']);
        });
    });
});