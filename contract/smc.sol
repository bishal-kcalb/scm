

// SPDX-License-Identifier: MIT


pragma solidity ^0.8.25;
contract SupplyChain {
    address[] ManufacturerList;
    address[] SupplierList;
    address[] DistributorList;
    address[] ShipperList;
    uint256[] MedicineList;
    uint256 manufacturerId = 0;
    uint256 supplierId = 0;
    uint256 distributorId = 0;
    uint256 medicineId = 0;
    uint256 orderId = 0;
    uint256 shipperId =0;

    address MOH;

    enum Role {
        user,
        MOH,
        Manufacturer,
        Supplier,
        Distributor,
        Shipper
        
    }

    enum Status {
        Pending,
        Accepted,
        Delivering,
        Delivered
    }

    struct manufacturerDetails {
        uint256 id;
        string name;
        string location;
        string contact;
        string email;
        uint256 joinedDate;
        address walletAddress;
        bool verified;
    }

    struct supplierDetails {
        uint256 id;
        string name;
        string location;
        string contact;
        string email;
        uint256 joinedDate;
        address walletAddress;
        bool verified;
    }

    struct distributorDetail {
        uint256 id;
        string name;
        string location;
        string contact;
        string email;
        uint256 joinedDate;
        string distributorType;
        address walletAddress;
        bool verified;
    }

    struct medicineDetails {
        uint256 medId;
        address manufacturer;
        string name;
        string medType;
        string manufacturedDate;
        string expiryDate;
        string description;
        uint256 mrp;
        string qrcodeUrl;
        address owner;
        string category;
        bool verified;
    }

    struct order{
       uint256[] medId; 
       uint256 orderId;
       address orderTo;
       address orderer;
       address shipper;
       bool ordererVerification;
       Status status;
    }

    struct delivery{
        uint256 deliveryId;
        string name;
        address walletAddress;
        string contact;
        string email;
        string location;
        bool verified;

    }

    mapping(address => Role) UserRole;
    mapping(address => manufacturerDetails) ManufacturerDetails;
    mapping(address => supplierDetails) SupplierDetails;
    mapping(uint256 => address) manufacturerAddress;
    mapping(uint256 => address) supplierAddress;
    mapping(address => address[]) manufacturerSupplierList;
    mapping(address => address[]) supplierManufacturerList;
    mapping (address => distributorDetail) DistributorDetails;
    mapping(address => delivery) ShipperDetails;
    mapping(address => string[]) ManufacturerCategory;
    // mapping(address => uint256[]) MedicineListInManufacturer;
    // mapping(address =>uint256[]) SoldMedicineListManufacturer;
    // mapping(address => uint256[]) supplierMedicineList;
    mapping(address => uint256[]) UserMedicineList;
    mapping(address => uint256[]) UserSoldMedicineList;

    mapping(uint256 => medicineDetails) MedicineDetails;
    mapping(uint256 => order) OrderDetail;
    mapping(address=>uint256[]) ManufacturerOrderList;
    mapping (address=>uint256[]) SupplierOrderList;
    mapping(address=>uint256[]) DeliveryOrderList;
    mapping(uint256=>Status) OrderStatus;


    function addShipper(string memory _name , address _walletAddress, string memory _email, string memory _contact, string memory _location) external {
        shipperId += 1;
        UserRole[_walletAddress] = Role.Shipper;
        ShipperDetails[_walletAddress] = delivery({
            deliveryId: shipperId,
            name: _name,
            walletAddress: _walletAddress,
            contact: _contact,
            email: _email,
            location: _location,
            verified: false
        });

        ShipperList.push(_walletAddress);
    }

    function placeOrder(address _userAddress, uint256[] memory medArray)external{
        orderId += 1;
        OrderDetail[orderId] = order({
            medId: medArray,
            orderId:orderId,
            orderTo:_userAddress,
            orderer:msg.sender,
            shipper:address(0),
            ordererVerification:false,
            status:Status.Pending
        });

        SupplierOrderList[msg.sender].push(orderId);
        ManufacturerOrderList[_userAddress].push(orderId);

    }

    function acceptOrder(uint256 _orderId)external{
        require(msg.sender==OrderDetail[_orderId].orderTo,'you are not orderTo');
        OrderDetail[_orderId].status = Status.Accepted;
    }

    function transferForDeliver(address _shipperAddress,uint256 _orderId) external{
        require(msg.sender==OrderDetail[_orderId].orderTo,'you are not orderTo');
        OrderDetail[_orderId].shipper= _shipperAddress;
        OrderDetail[_orderId].status = Status.Delivering;
        DeliveryOrderList[_shipperAddress].push(_orderId);
    }

    function ordererVerification(uint256 _orderId) external{
        require(msg.sender==OrderDetail[_orderId].orderer,'you are not orderTo');
        OrderDetail[_orderId].ordererVerification=true;
    }



    function getManufacturerOrderList(address _address) public view returns (order[] memory){
        order[] memory orderList = new order[](ManufacturerOrderList[_address].length);
        for(uint256 i = 0; i<ManufacturerOrderList[_address].length;i++){
            orderList[i] = OrderDetail[ManufacturerOrderList[_address][i]];
        }

        return orderList;
    }

    function getSupplierOrderList(address _address) public view returns (order[] memory){
        order[] memory orderList = new order[](SupplierOrderList[_address].length);
        for(uint256 i = 0; i<SupplierOrderList[_address].length;i++){
            orderList[i] = OrderDetail[SupplierOrderList[_address][i]];
        }

        return orderList;
    }

    function getDeliveryOrderList(address _address) public view returns (order[] memory){
        order[] memory orderList = new order[](DeliveryOrderList[_address].length);
        for(uint256 i = 0; i<DeliveryOrderList[_address].length;i++){
            orderList[i] = OrderDetail[DeliveryOrderList[_address][i]];
        }

        return orderList;
    }

    constructor(address _owner){
        MOH = _owner;
        UserRole[_owner] = Role.MOH;
    }

    function changeMOHAddres(address _address) external{
        require(msg.sender == MOH,"You are not the owner");
        MOH = _address;
        UserRole[_address] = Role.MOH;
    }

    function addManufacturer(
        string memory _name,
        string memory _location,
        string memory _contact,
        string memory _email,
        address _manufacturerAddress
    ) external {
        manufacturerId += 1;
        ManufacturerList.push(_manufacturerAddress);
        UserRole[_manufacturerAddress] = Role.Manufacturer;
        manufacturerAddress[manufacturerId] = _manufacturerAddress;
        ManufacturerDetails[_manufacturerAddress] = manufacturerDetails({
            id: manufacturerId,
            name: _name,
            location: _location,
            contact: _contact,
            email: _email,
            joinedDate: block.timestamp,
             walletAddress:_manufacturerAddress,
            verified: false
        });
    }

    function addSupplier(
        string memory _name,
        string memory _location,
        string memory _contact,
        string memory _email,
        address _supplierAddress
    ) external {
        supplierId += 1;
        SupplierList.push(_supplierAddress);
        UserRole[_supplierAddress] = Role.Supplier;
        supplierAddress[supplierId] = _supplierAddress;

        manufacturerSupplierList[msg.sender].push(_supplierAddress);
        SupplierDetails[_supplierAddress] = supplierDetails({
            id: supplierId,
            name: _name,
            location: _location,
            contact: _contact,
            email: _email,
            joinedDate: block.timestamp,
            walletAddress:_supplierAddress,
            verified: false
        });
    }

    function addDistributor(
        string memory _name,
        string memory _location,
        string memory _contact,
        string memory _email,
        string memory _type,
        address _distributorAddress
    ) external {
        distributorId += 1;
        DistributorList.push(_distributorAddress);
        UserRole[_distributorAddress] = Role.Distributor;
        // supplierAddress[supplierId] = _supplierAddress;
        DistributorDetails[_distributorAddress] = distributorDetail({
            id:  distributorId,
            name: _name,
            location: _location,
            contact: _contact,
            email: _email,
            joinedDate: block.timestamp,
            distributorType: _type,
            walletAddress: _distributorAddress,
            verified: false
        });
    }

    function addMedCategory(string memory _name) external {
        ManufacturerCategory[msg.sender].push(_name);
    }

    function addMedicine(
        string memory _name,
        string memory _medType,
        string memory _manufacturedDate,
        string memory _expiryDate,
        string memory _description,
        uint256 _mrp,
        string memory _qrcodeUrl,
        string memory _category
    ) external {
        require(UserRole[msg.sender] == Role.Manufacturer,"You are not manufacturer");
        require(ManufacturerDetails[msg.sender].verified == true, "not verified");
        medicineId += 1;
        MedicineList.push(medicineId);
        UserMedicineList[msg.sender].push(medicineId);
        MedicineDetails[medicineId] = medicineDetails({
            medId: medicineId,
            manufacturer: msg.sender,
            name: _name,
            medType: _medType,
            manufacturedDate: _manufacturedDate,
            expiryDate: _expiryDate,
            description: _description,
            mrp: _mrp,
            qrcodeUrl: _qrcodeUrl,
            owner: msg.sender,
            category: _category,
            verified: false
        });
    }


    function verifyManufacturer(address _id) external {
        require(msg.sender == MOH, "You are not the MOH");
        ManufacturerDetails[_id].verified = true;
    }

    function verifyMedicine(uint256 _id) external {
        require(msg.sender == MOH, "You are not the MOH");
        MedicineDetails[_id].verified = true;
    }

    function verifySupplier(address _address) external {
        require(msg.sender == MOH, "You are not the MOH");
        SupplierDetails[_address].verified = true;
    }



        function sellMedInBulk(address _address, uint256[] memory _medArray, uint256 _orderId ) internal {
        require(OrderDetail[_orderId].shipper == msg.sender,"not owner");
        for(uint256 i=0; i<_medArray.length; i++){
            require(MedicineDetails[_medArray[i]].owner == OrderDetail[_orderId].orderTo,"not owner");
                    for (uint256 j = 0;j < UserMedicineList[OrderDetail[_orderId].orderTo].length;j++) {
                         if (UserMedicineList[OrderDetail[_orderId].orderTo][j] == _medArray[i]) {
                             UserMedicineList[OrderDetail[_orderId].orderTo][j] = UserMedicineList[OrderDetail[_orderId].orderTo][UserMedicineList[OrderDetail[_orderId].orderTo].length - 1];
                             UserMedicineList[OrderDetail[_orderId].orderTo].pop();
                             break;
                          }

                     }
             UserMedicineList[_address].push(_medArray[i]);
             UserSoldMedicineList[OrderDetail[_orderId].orderTo].push(_medArray[i]);
             MedicineDetails[_medArray[i]].owner = _address;
        }
    }

    function deliverOrder(uint256 _orderId) external {
        require(msg.sender==OrderDetail[_orderId].shipper,'you are not shipper');
        require(OrderDetail[_orderId].ordererVerification = true,"orderer has not verified the order");
        sellMedInBulk(OrderDetail[_orderId].orderer,OrderDetail[_orderId].medId,_orderId);
        OrderDetail[_orderId].status = Status.Delivered;
    }

    // function getManufacturerList() public view returns (address[] memory) {
    //     return ManufacturerList;
    // }

    function getManufacturerDetails(address _manufacturerId)
        public
        view
        returns (manufacturerDetails memory)
    {
        return ManufacturerDetails[_manufacturerId];
    }

    function getSupplierDetails(address _supplierAddress) public view returns(supplierDetails memory){
        return SupplierDetails[_supplierAddress];
    }

    function getDistributorDetails( address _distributorAddress) public view returns(distributorDetail memory){
        return DistributorDetails[_distributorAddress];
    }

    function getShipperDetails( address _shipperAddress ) public view returns(delivery memory){
     return ShipperDetails[_shipperAddress];
    }

    function getMedicineDetails(uint256 _medicineId, address _manufacturerId)
        public
        view
        returns (uint256[] memory, medicineDetails memory)
    {
        return (
            UserMedicineList[_manufacturerId],
            MedicineDetails[_medicineId]
        );
    }


    // function getManufacturerSupplierList(address _manufacturerId)
    //     public
    //     view
    //     returns (supplierDetails[] memory)
    // {
    //     supplierDetails[] memory allSuppliers = new supplierDetails[](
    //         manufacturerSupplierList[_manufacturerId].length
    //     );

    //     for (
    //         uint256 i = 0;
    //         i < manufacturerSupplierList[_manufacturerId].length;
    //         i++
    //     ) {
    //         allSuppliers[i] = SupplierDetails[
    //             manufacturerSupplierList[_manufacturerId][i]
    //         ];
    //     }

    //     return allSuppliers;
    // }

    // function getManufacturerMedicineList(address _id)
    //     public
    //     view
    //     returns (medicineDetails[] memory)
    // {
    
    //     medicineDetails[] memory allMedicine = new medicineDetails[](
    //         UserMedicineList[_id].length
    //     );
    //     for (uint256 i = 0; i < UserMedicineList[_id].length; i++) {
    //         allMedicine[i] = MedicineDetails[
    //             UserMedicineList[_id][i]
    //         ];
    //     }
    //     return allMedicine;
    // }

    // function getManufacturerSoldMedicineList(address _id) public view returns(medicineDetails[] memory){
    //     medicineDetails[] memory allSoldMedicine = new medicineDetails[](UserSoldMedicineList[_id].length);
    //     for(uint256 i = 0; i<UserSoldMedicineList[_id].length; i++){
    //         allSoldMedicine[i] = MedicineDetails[UserSoldMedicineList[_id][i]];
    //     }

    //     return  allSoldMedicine;
    // }


    // function getSupplierMedicineList(
    //     address _supplierId
    // ) public view returns (medicineDetails[] memory) {
    //     medicineDetails[] memory allMedicine = new medicineDetails[](UserMedicineList[_supplierId].length);
    //     for (uint256 i =0; i<UserMedicineList[_supplierId].length; i++){
    //         allMedicine[i] = MedicineDetails[UserMedicineList[_supplierId][i]];
    //     }
    //     return allMedicine;
    // }

    function getUserMedicineList(address _userAddress) public view returns(medicineDetails[]memory){
                medicineDetails[] memory allMedicine = new medicineDetails[](UserMedicineList[_userAddress].length);
        for (uint256 i =0; i<UserMedicineList[_userAddress].length; i++){
            allMedicine[i] = MedicineDetails[UserMedicineList[_userAddress][i]];
        }
        return allMedicine;
    }

    function getUserSoldMedicineList(address _userAddress) public view returns(medicineDetails[] memory){
                medicineDetails[] memory allSoldMedicine = new medicineDetails[](UserSoldMedicineList[_userAddress].length);
        for(uint256 i = 0; i<UserSoldMedicineList[_userAddress].length; i++){
            allSoldMedicine[i] = MedicineDetails[UserSoldMedicineList[_userAddress][i]];
        }

        return  allSoldMedicine;
    }

    // function getSupplierManufacturerList(address _supplierId)
    //     public
    //     view
    //     returns (manufacturerDetails[] memory)
    // {
    //     // supplierManufacturerList
    //     manufacturerDetails[] memory allManufacturer = new manufacturerDetails[](supplierManufacturerList[_supplierId].length);
    //     for (uint256 i = 0; i<supplierManufacturerList[_supplierId].length; i++){
    //         allManufacturer[i] = ManufacturerDetails[supplierManufacturerList[_supplierId][i]];
    //     }

    //     return allManufacturer;
    // }

    // function getSupplierList() public view returns (address[] memory) {
    //     return SupplierList;
    // }

    function getUserRole(address _user)
        public
        view
        returns (string memory, address)
    {
        if (UserRole[_user] == Role.Manufacturer) {
            return ("Manufacturer", _user);}
         if (UserRole[_user] == Role.Supplier) {
            return ("Supplier", _user);
        } 

        if(UserRole[_user] == Role.Distributor) {
            return ("Distributor", _user);
        }

        if(UserRole[_user] == Role.MOH){
            return("MOH", _user);
        }

        if(UserRole[_user] == Role.Shipper){
            return("Shipper", _user);
        }

        return("User",_user);
    }

    function getallManufacturerDetail()
        public
        view
        returns (manufacturerDetails[] memory)
    {
        // Initialize the array with the size of ManufacturerList
        manufacturerDetails[]
            memory allManufacturers = new manufacturerDetails[](
                ManufacturerList.length
            );

        // Populate the array with manufacturer details
        for (uint256 i = 0; i < ManufacturerList.length; i++) {
            allManufacturers[i] = ManufacturerDetails[ManufacturerList[i]];
        }

        // Return the array
        return allManufacturers;
    }

    function getAllSupplierDetails()
        public
        view
        returns (supplierDetails[] memory)
    {
        supplierDetails[] memory allSuppliers = new supplierDetails[](
            SupplierList.length
        );

        for (uint256 i = 0; i < SupplierList.length; i++) {
            allSuppliers[i] = SupplierDetails[SupplierList[i]];
        }

        return allSuppliers;
    }

    function getAllDistributorDetails() public view returns(distributorDetail[ ] memory){
                distributorDetail[] memory allDistributor = new distributorDetail[](
            DistributorList.length
        );

        for (uint256 i = 0; i < DistributorList.length; i++) {
            allDistributor[i] = DistributorDetails[DistributorList[i]];
        }

        return allDistributor;
    }

    function getAllShipperDetails() public view returns(delivery [] memory){
                delivery[] memory allShipper = new delivery[](
            ShipperList.length
        );

        for (uint256 i = 0; i < ShipperList.length; i++) {
            allShipper[i] = ShipperDetails[ShipperList[i]];
        }

        return allShipper;
    }

    function getAllMedicineDetails()
        public
        view
        returns (medicineDetails[] memory)
    {
        medicineDetails[] memory allMedicines = new medicineDetails[](
            MedicineList.length
        );
        for (uint256 i = 0; i < MedicineList.length; i++) {
            allMedicines[i] = MedicineDetails[MedicineList[i]];
        }

        return allMedicines;
    }
}
