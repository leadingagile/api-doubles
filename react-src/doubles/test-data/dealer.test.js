const chai = require('chai');
const expect = chai.expect;
const { faker } = require('@faker-js/faker');

class A {
  static dealer() {
    return {
      code: 'GBR|42184|MA|F',
      name: 'Gates of Woodford',
      address: {
        line1: faker.address.streetAddress(),
        town: faker.address.city(),
        region: {
          name: faker.address.county(),
        },
        postalCode: faker.helpers.replaceSymbols('??## #??'),
        phone: faker.phone.phoneNumber('### #### ####'),
        country: {
          isocode: 'GBR',
          name: 'United Kingdom',
        },
      },
      aldFlag: true,
      isDealerResvEnrolled: false,
      isDealerOrderEnrolled: false,
      evEuCertificationFlag: true,
      dealerWallboxEnrolled: false,
      dealerVATNo: faker.helpers.replaceSymbols('??#########'),
    };
  }
}

describe('dealer', function () {
  it('returns our default dealer', function () {
    const dealer = A.dealer();

    expect(dealer).to.have.property('code', 'GBR|42184|MA|F');
    expect(dealer).to.have.property('name');
    expect(dealer).to.have.property('aldFlag', true);
    expect(dealer).to.have.property('isDealerResvEnrolled', false);
    expect(dealer).to.have.property('isDealerOrderEnrolled', false);
    expect(dealer).to.have.property('evEuCertificationFlag', true);
    expect(dealer).to.have.property('dealerWallboxEnrolled', false);
    expect(dealer).to.have.property('dealerVATNo');
    expect(dealer).to.have.nested.property('address.line1');
    expect(dealer).to.have.nested.property('address.town');
    expect(dealer).to.have.nested.property('address.postalCode');
    expect(dealer).to.have.nested.property('address.region.name');
    expect(dealer).to.have.nested.property('address.country.name');
    expect(dealer).to.have.nested.property('address.country.isocode');

  });
});
