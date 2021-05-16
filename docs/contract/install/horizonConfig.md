Config file of Horizon has particular variables:
````
#PER_HOUR_RATE_LIMIT: max count of requests allowed in a one hour period, by remote ip address
PER_HOUR_RATE_LIMIT=100000

#INGEST: causes this horizon process to ingest data from stellar-core into horizon's db
INGEST=true 

#DATABASE_URL: horizon postgres database to connect with
DATABASE_URL="postgres://?user=<postgres user>&password=<postgres password>&host=<host of postgres to connect>&sslmode=disable"

#STELLAR_CORE_DATABASE_URL: stellar-core postgres database to connect with
STELLAR_CORE_DATABASE_URL="postgres://?user=<postgres user>&password=<postgres password>&host=<host of stellar's postgres>&sslmode=disable&dbname=<database name of Stellar core>"

#STELLAR_CORE_URL: stellar-core to connect with (for http commands)
STELLAR_CORE_URL="http(s)://host:<stellar port(current is 11626)>"

#HISTORY_RETENTION_COUNT: the minimum number of ledgers to maintain within horizon's history tables. 0 signifies an unlimited number of ledgers will be retained
HISTORY_RETENTION_COUNT=12600
````