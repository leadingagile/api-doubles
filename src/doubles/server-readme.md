## To generate cert files needed for express https:

### Run all the steps

```shell
    ./scripts/doubles-cert-creation/generate_cert_files.sh
```

#### Options

```
generate_cert_files.sh [ -d domain-name | --domain domain-name]
                       [ -c common-name | --common-name common-name]

  -d | --domain
      set the domain name for the certificate files
      defaults to 'localhost.ford.com'

  -c | --common-name
      set the common name for the certificate files
      defaults to the domain name with '*.' prepended
```

### Run each step separately

#### create root cert

`./scripts/doubles-cert-creation/create_root_cert_and_key.sh`

```
Country Name (2 letter code) []:UK
State or Province Name (full name) []:bob
Locality Name (eg, city) []:london
Organization Name (eg, company) []:ford
Organizational Unit Name (eg, section) []:px
Common Name (eg, fully qualified host name) []:PX
Email Address []:ford@mailinator.com
```

#### Create cert for domain

`./scripts/doubles-cert-creation/create_certificate_for_domain.sh localhost.ford.com`

#### Add cert to Mac keychain

`./scripts/doubles-cert-creation/add_root_certificate_to_keychain.sh`


## Run the doubles server at https://localhost.ford.com:8001/

`npm run start:doubles`

### Sample route to cart:
`api/secure-purchase/gep/UK/v1/carts/sit-12345?lang=en_gb`

### Be sure to have your content right.
As of 4/4, the latest working one is
`eu_dev_content-2022-03-04.zip`
from a March 4, 2022 message in Developer Only Chat in Webex.

### Reminder about double urls
To change local urls to point to a local double server, set them in the local config
`...BUY_GUX_EU/aem/sites/src/main/content/jcr_root/apps/bev-cart_checkout/sites/config.local/com.ford.bev.aem.sites.services.CheckoutConfigService.xml`
and remember to gradle again.


### "Fail to compile"
If you see this message, you're not using the version of node that the project needs.