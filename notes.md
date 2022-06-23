# Sharing public files in Storj

## Preparación del bucket:
* No damos de alta en Storj
* Creamos el bucket
* Creamos una access grant para conectar `uplink`
  * Acceso por tiempo ilimitado, todos los permisos, para el bucket en cuestión.
  * Anotamos cuidadosamente la contraseña que proporcionemos.
  * Descargamos el fichero del grant generado y lo conservamos cuidadosamente. Será el que permita el acceso desde `uplink`.
    * access-grant-2022-06-23T04_10_15.501Z.key
  * Creamos las credenciales S3. Serán las que permitan el accedo desde el backend.
  * Anotamos cuidadosamente las credenciales de S3:
    * key
    * secret
    * proxy

## Creación del acceso público
  * Descargamos `uplink`
    * https://docs.storj.io/dcs/downloads/download-uplink-cli/
  * Lo conectamos al bucket usando el fichero del grant y creamos el acceso público por HTTP para el bucket.
    ```bash
    ./uplink access import nombre-para-el-acceso access-grant-borrame.key 
    ./uplink access list
    ./uplink access use nombre-para-el-acceso
    ./uplink access list
    ./uplink share sj://recipes/ --url --not-after=none
    ```
  * Anotamos cuidadosamente toda la información proporcionada por `uplink`:
```txt
Sharing access to satellite 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://borrame/ (entire bucket)
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 1S9x2d9A3mmnyRC6RjGSZrmqL3faNKVak5WBouwDP3cKPipfxZcwDZjwFK3LSsC7oVAg13TpirPEBVxBKfKCc1ruQ8GqrQgSAf2MzX3ySrB2ESs1LGhP4u46UFnp47yHqRLPbCdBRPbbyVsEW2Kv6eNL2TTa39FbtPybjj7cbW4e9FrzPnu2XkPHst8WAnpaeP47GeeVQdTKNbv1BbyHrSz7gAySpn2rKi14LAx53MDhndgwRoA9MMGAzC3aCwjMNCWqMHty3W5TKNG55J6X473WkfS1pYVAsPAaHhKkDZobj3yZMwmXU2XPwGUTZnvYbdod37oYKPrwPRg
========== CREDENTIALS ===================================================================
Access Key ID: jw2pwrchebqduj2g2jtfgibeielq
Secret Key   : j2jh7ul25ykmu7ebnplo65oa7rztxowho4eugpericek5igqr7bpq
Endpoint     : https://gateway.storjshare.io
Public Access:  true
=========== BROWSER URL ==================================================================
URL       : https://link.storjshare.io/s/jw2pwrchebqduj2g2jtfgibeielq/borrame
```
* El link del final nos porporciona el acceso público a la carpeta. Podemo usarlo concatenando el nombre del fichero en el bucket de la siguiente manera:
`https://link.storjshare.io/s/${S3key}/${bucket}/${filename}?wrap=0`
* Por ejemplo:
```html
<img src="https://link.storjshare.io/s/jw2pwrchebqduj2g2jtfgibeielq/borrame/gatitos.jpg?wrap=0" alt="Lindos gatitos">
```