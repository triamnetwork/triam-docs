---
Architecture
---

Anchors are entities that people trust to hold their deposits and [issue credits](../issuing-assets.md) into the Triam network for those deposits. All money transactions in the Triam network (except RIA) occur in the form of credit issued by anchors, so anchors act as a bridge between existing currencies and the Triam network. Most anchors are organizations like banks, savings institutions, farmers’ co-ops, central banks, and remittance companies.

Before continuing, you should be familiar with:

- [Issuing assets](../issuing-assets.md), the most basic activity of an anchor.
- [Federation](../concepts/federation.md), which allows a single Triam account to represent multiple people.
- [Compliance](../compliance-protocol.md), if you are subject to any financial regulation.


## Account Structure

As an anchor, you should maintain at least two accounts:

- An **issuing account** used only for issuing and destroying assets.
- A **base account** used to transact with other Triam accounts. It holds a balance of assets issued by the *issuing account*.

Create them on the test network using the [laboratory](https://triam.org/laboratory/) or the steps from the [“get started” guide](../get-started/create-account.md).

For this guide, we’ll use the following keys:

<dl>
  <dt>Issuing Account ID</dt>
  <dd><code>GAIUIQNMSXTTR4TGZETSQCGBTIF32G2L5P4AML4LFTMTHKM44UHIN6XQ</code></dd>
  <dt>Issuing Seed</dt>
  <dd><code>SBILUHQVXKTLPYXHHBL4IQ7ISJ3AKDTI2ZC56VQ6C2BDMNF463EON65U</code></dd>
  <dt>Base Account ID</dt>
  <dd><code>GAIGZHHWK3REZQPLQX5DNUN4A32CSEONTU6CMDBO7GDWLPSXZDSYA4BU</code></dd>
  <dt>Base Seed</dt>
  <dd><code>SAV75E2NK7Q5JZZLBBBNUPCIAKABN64HNHMDLD62SZWM6EBJ4R7CUNTZ</code></dd>
</dl>



### Customer Accounts

There are two simple ways to account for your customers’ funds:

1. Maintain a Triam account for each customer. When a customer deposits money with your institution, you should pay an equivalent amount of your custom asset into the customer’s Triam account from your *base account*. When a customer needs to obtain physical currency from you, deduct the equivalent amount of your custom asset from their Triam account.

    This approach simplifies bookkeeping by utilizing the Triam network instead of your own internal systems. It can also allow your customers a little bit more control over how their account works in Triam.

2. Use [federation](../concepts/federation.md) and the [`memo`](../concepts/transactions.md#memo) field in transactions to send and receive payments on behalf of your customers. In this approach, transactions intended for your customers are all made using your *base account*. The `memo` field of the transaction is used to identify the actual customer a payment is intended for.

    Using a single account requires you to do additional bookkeeping, but means you have fewer keys to manage and more control over accounts. If you already have existing banking systems, this is the simplest way to integrate Triam with them.

You can also create your own variations on the above approaches. **For this guide, we’ll follow approach #2—using a single Triam account to transact on behalf of your customers.**


## Data Flow

In order to act as an anchor, your infrastructure will need to:

- Make payments.
- Monitor a Triam account and update customer accounts when payments are received.
- Look up and respond to requests for federated addresses.
- Comply with Anti-Money Laundering (AML) regulations.

Triam provides a prebuilt [federation server](https://github.com/triamnetwork/go/tree/master/services/federation) and [regulatory compliance server](https://github.com/triamnetwork/bridge-server/blob/master/readme_compliance.md) designed for you to install and integrate with your existing infrastructure. The [bridge server](https://github.com/triamnetwork/bridge-server/blob/master/readme_bridge.md) coordinates them and simplifies interacting with the Triam network. This guide demonstrates how to integrate them with your infrastructure, but you can also write your own customized versions.

### Making Payments

When using the above services, a complex payment using federation and compliance works as follows:

![Diagram of sending a payment](assets/anchor-send-payment-compliance.png)

1. A customer using your organization’s app or web site sends a payment using your services.
2. Your internal services send a payment using the bridge server.
3. The bridge server determines whether compliance checks are needed and forwards transaction information to the compliance server.
4. The compliance server determines the receiving account ID by looking up the federation address.
5. The compliance server contacts your internal services to get information about the customer sending the payment in order to provide it to the receiving organization’s compliance systems.
6. If the result is successful, the bridge server creates a transaction, signs it, and sends it to the Triam network.
7. Once the transaction is confirmed on the network, the bridge server returns the result to your services, which should update your customer’s account.


### Receiving Payments:

When someone is sending a transaction to you, the flow is slightly different:



1. The sender looks up the Triam account ID to send the payment to based on your customer’s federated address from your federation server.
2. The sender contacts your compliance server with information about the person sending the payment.
3. Your compliance server contacts three services you implement:
    1. A sanctions callback to determine whether the sender is permitted to pay your customer.
    2. If the sender wants to check your customer’s information, a callback is used to determine whether you are willing to share your customer’s information.
    3. The same callback used when sending a payment (above) is used to actually get your customer’s information.
4. The sender submits the transaction to the Triam network.
5. The bridge server monitors the Triam network for the transaction and sends it to your compliance server to verify that it was the same transaction you approved in step 3.1.
6. The bridge server contacts a service you implement to notify you about the transaction. You can use this step to update your customer’s account balances.

**While these steps can seem complicated, Triam’s bridge, federation, and compliance services do most of the work.** You only need to implement four callbacks and create a [triam.toml](../concepts/triam-toml.html) file where others can find the URL of your services.

In the rest of this guide, we’ll walk through setting up each part of this infrastructure step by step.

<nav class="sequence-navigation">
  <a rel="next" href="2-bridge-server.md">Next: Bridge Server</a>
</nav>
