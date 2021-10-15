Config file of Stellar Core has particular variables:
````
#DATABASE: setting database use for Stellar Core
DATABASE="postgresql://dbname=<DB Name> user=<User of postgres> password=<password of postgres> host=localhost"

#ADMIN_ADDRESS: public address of the root wallet which is contained all the native coin of blockchain
ADMIN_ADDRESS="GBAQ6RHTTQKZEMFDBN2BVCRNV4EMMX7GRWUP44Y35EN3V3QYLVJNRZKR" 
#BASE_NATIVE_AMOUNT: amount of native asset created by initial progress
BASE_NATIVE_AMOUNT=328500000410030000

#Minimum amount of native asset in an active account will be calculated by this formula ( BASE_RESERVE_INIT + NUMBER OF SUB ENTRIES ) x BASE_RESERVE

#BASE_RESERVE: 
BASE_RESERVE=100000000

#BASE_RESERVE_INIT:
BASE_RESERVE_INIT=2

#BASE_RESERVE_ONLY: If this variable is true, NUMBER OF SUB ENTRIES will be igroned. NUMBER OF SUB ENTRIES is Trustlines, Offers, Signers and Data entries.
BASE_RESERVE_ONLY=true

#INFLATION_RATE_TRILLIONTHS:
INFLATION_RATE_TRILLIONTHS=0

#DOCKER_HOST: Host to connect docker engine api, you must setup same the host config in enable docker engine api.
DOCKER_HOST="127.0.0.1"

#DOCKER_PORT: port docker engine api, you must setup same the host config in enable docker engine api.
DOCKER_PORT=4343

#DIR_CONTRACT: directory store contract file
DIR_CONTRACT="/home/ubuntu/vol/"

#HOST_CONTRACT: host for core download contract file
HOST_CONTRACT="https://triam-dev-triamsmartcontract.s3.ap-southeast-1.amazonaws.com/contract-execute-file/"

#HTTP_PORT: the port stellar-core listens for commands on
HTTP_PORT=11626

#PUBLIC_HTTP_PORT: the port stellar-core listens for commands on
PUBLIC_HTTP_PORT=true

#HTTP_MAX_CLIENT: maximum number of simultaneous HTTP clients
HTTP_MAX_CLIENT=128

#RUN_STANDALONE: this is a mode for testing. If set it to true, it prevents your core from trying to connect to other peers
RUN_STANDALONE=false

#NODE_NAMES: convenience mapping of common names to node IDs. The common names can be used in the  *.cfg `$common_name`. If set, they will also appear in your logs instead of the less friendly nodeID
NODE_NAMES=[
 "GA22N4YGO7IJDRF2SISA5KHULGYYKDXBQGYIWUVNMSNHF5G2DNBKP3M5 eliza",
 "GCDENOCHA6TQL6DFC4FS54HIH7RP7XR7VZCQZFANMGLT2WXJ7D7KGV2P hal9000"
]

#LOG_FILE_PATH: Path to the file you want stellar-core to write its log to, you can set to "" for no log file
LOG_FILE_PATH="/usr/local/arm-core/log/stellar-core.log"

#BUCKET_DIR_PATH: specifies the directory where stellar-core should store the bucket list.
BUCKET_DIR_PATH="/usr/local/arm-core/bucket/buckets"

#NETWORK_PASSPHRASE: 
NETWORK_PASSPHRASE="Passphrase for document"

#PEER_PORT: the port other instances of stellar-core can connect to you on
PEER_PORT=11625

#MAX_PEER_CONNECTIONS: 
MAX_PEER_CONNECTIONS=12

#NODE_SEED: The seed used for generating the public key this node will be identified with in SCP. Your seed should be unique. To genarate a new seed run stellar-core --genseed
NODE_SEED=[
 "SBI3CZU7XZEWVXUOH43IRTEQ2QYXU5RG7OZLW5MMUQAP334JFOPXSLTP"
]

#FAILURE_SAFETY:
FAILURE_SAFETY=0

#UNSAFE_QUORUM:
UNSAFE_QUORUM=true

#CATCHUP_COMPLETE: if true will catchup to the network "completely" (replaying all history), if false will look for CATCHUP_RECENT for catchup settings
CATCHUP_COMPLETE=true

#CATCHUP_RECENT: if CATCHUP_COMPLETE is true this option is ignored, if set to any number, will catchup to some past snapshot, then will reply history from that point to current snapshot, ensuring that at least CATCHUP_RECENT number of ledger entries will be present in database
CATCHUP_RECENT=1024


#[QUORUM_SET]: is a required field
#THRESHOLD_PERCENT: is how many have to agree (1-100%) within a given set
#VALIDATORS: the array of node IDs (can use $common_name here)

[QUORUM_SET]
THRESHOLD_PERCENT=100
VALIDATORS=["<$node_name or ID>"]

#[HISTORY.<history_name>]: used to specify where to fetch and store the history archives. <history_name> is the same as when you run stellar-core --newhist  <history_name>
[HISTORY.local]
get="(aws s3) cp <directory>/{0} {1}"
put="(aws s3) cp {0} <directory>/{1}"
(optional)mkdir="mkdir -p <directory>/{0}"
````