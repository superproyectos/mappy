async function setEmail()
{
    const dao=new UserDAO();
    const user = await dao.getUser();
    $('.email-me').text(user.email);
}

class ParserFromJsonToObject
{
    parseCollectionAddress(json)
    {
        const field=json.collection_address_id;
        return new CollectionAddress(field.country, field.city,
            field.line1, field.line2, field.zipCode);
    }

    parseDeliveryAddress(json)
    {
        const field=json.delivery_address_id;
        const deliveryAddress=new DeliveryAddress(field.country, field.city, field.line1,
                field.line2, field.zipCode, field.description);
        deliveryAddress.addCoordinates(new Coordinates(json.delivery_address_id.latitude,
            json.delivery_address_id.longitude));
        return deliveryAddress;
    }

    parseUser(json)
    {

    }

    parsePackage(json)
    {
        return new Package(json.weight, json.description,json.order);
    }
}

class OrderManager
{
    constructor()
    {
        this.myOrders=[];
    }

    addOrder(order)
    {
        const parser=new ParserFromJsonToObject();
        let newOrder=new CollectionOrder(
            order.collection_order_id,
            parser.parseCollectionAddress(order),
            parser.parseDeliveryAddress(order),
            order.recipientsName, order.recipientsSurname);
        this.setPackagesTo(newOrder, order);
        this.myOrders.push(newOrder);
    }

    setPackagesTo(order,json)
    {
        const parser=new ParserFromJsonToObject();
        for (let i=0;i<json.order.length;i++)
        {
            const p=parser.parsePackage(json.order[i]);
            order.addPackages(p);
        }
    }

    hasOrders()
    {
        return this.myOrders.length>0;
    }

    showCollectionOrders()
    {
        for(let i=0;i<this.myOrders.length;i++)
        {
            new CollectionOrderCard(this.myOrders[i]);
            myMap.addMarker(this.myOrders[i]);
        }
    }

    delete(order)
    {

        for(let i=0;i<this.myOrders.length;i++)
        {

            if(this.myOrders[i].id==order.id)
            {
                this.myOrders.splice(i, 1);
                break;
            }
        }
        this.reset();
    }

    reset()
    {
        myMap.clearMarkers();
        CollectionOrderCard.clear()
        this.showCollectionOrders();
    }
}

const orderManager=new OrderManager();

async function getAllCollectionOrders()
{
    const dao = new CollectionOrderDAO();
    const collectionOrders=await dao.getAll();
    for(let i=0;i<collectionOrders.length;i++)
    {
        orderManager.addOrder(collectionOrders[i]);
    }
    if(!orderManager.hasOrders())
    {
        emptyCollectionOrder.show();
    }
    orderManager.showCollectionOrders();
}

const collectionAddresses=[];
async function getAllCollectionAddresses()
{
    const dao=new CollectionAddressDAO();
    const response=await dao.getAll();
    const addresses=response[0].collection_address;
    for(let i=0;i<addresses.length;i++)
    {
        let t=addresses[i];
        let collectionAddress=new CollectionAddress(t.country,t.city,t.line1,t.line2, t.zipCode);
        if(!isRepeatedCollectionAddress(collectionAddress))
        {
            putInSelect(collectionAddress);
            collectionAddresses.push(collectionAddress);
        }
    }
}

function isRepeatedCollectionAddress(collectionAddress)
{
    for(let i=0;i<collectionAddresses.length;i++)
    {
        let address=collectionAddresses[i];
        if(address.equals(collectionAddress))
            return true;
    }
    return false;
}

function putInSelect(collectionAddress)
{
    $("#select-modal-c").append(
        "<option value='"+collectionAddresses.length+"'>"+
        collectionAddress.line1+"</option>");
}

function fillBoxes()
{
    let index= $("#select-modal-c").val();
    if(index!="null")
    {
        $("#modal_c_city").val(collectionAddresses[index].city);
        $("#modal_c_line1").val(collectionAddresses[index].line1);
        $("#modal_c_line2").val(collectionAddresses[index].line2);
        $("#modal_c_zipCode").val(collectionAddresses[index].zipCode);
    }
    else
    {
        $("#modal_c_city").val("");
        $("#modal_c_line1").val("");
        $("#modal_c_line2").val("");
        $("#modal_c_zipCode").val("");
    }

}