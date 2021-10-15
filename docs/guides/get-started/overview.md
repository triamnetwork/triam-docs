---
Triam Network Overview
---
![Triam Ecosystem](https://www.Triam.org/wp-content/uploads/2016/06/Triam-Ecosystem-v031.png)

Using the Triam network, you can build mobile wallets, banking tools, smart devices that pay for themselves, and just about anything else you can dream up involving payments! Even though Triam is a complex distributed system, working with it doesn’t need to be complicated.

> **Triam Network v2 Upgrade Countdown**
> 
> Triam Network plans to upgrade to version 2 at **09:00AM(UTC+8) October 18, 2021**

## API: Horizon

**Most applications interact with the Triam network through Horizon,** a RESTful HTTP API server. Horizon gives you a straightforward way to submit transactions, check accounts, and subscribe to events. Because it’s just HTTP, you can communicate with Horizon using your web browser, simple command line tools like cURL, or the Triam SDK for your favorite programming language.

The easiest way to install Horizon is by using [**triam/quickstart** docker image](https://hub.docker.com/r/triam/quickstart/).

TriamNetwork.com maintains [JavaScript](https://github.com/triamnetwork/js-triam-sdk), [Java](https://github.com/triamnetwork/java-triam-sdk), and [Go](https://github.com/triamnetwork/go/tree/master/clients/horizon)-based SDKs for communicating with Horizon. There are also community-maintained SDKs for [Ruby](https://github.com/triamnetwork/ruby-triam-sdk), [Python](https://github.com/triamnetwork/py-triam-base), and [C#](https://github.com/QuantozTechnology/csharp-triam-base).

## Network Backbone: Triam Core

Behind the scenes, every Horizon server connects to **[Triam Core](../../triam-core/learn/admin.html), the backbone of the Triam network.** The Triam Core software does the hard work of validating and agreeing with other instances of Core on the status of every transaction through the [Stellar Consensus Protocol](../concepts/scp.html) (SCP). The Triam network itself is a collection of connected Triam Cores run by various individuals and entities around the world. Some instances have a Horizon server you can communicate with, while others exist only to add reliability to the overall network.

The easiest way to install Triam Core is by using [**triam/quickstart** docker image](https://hub.docker.com/r/triam/quickstart/).

You might want to host your own instance of Triam Core in order to submit transactions without depending on a third party, have more control over who to trust, or simply to help make the Triam network more reliable and robust for others.

## Big Picture: The Triam Network

The Triam network is a worldwide collection of Triam Cores, each maintained by different people and organizations. The distributed nature of the network makes it reliable and safe.

All these Triam Cores—the network of nodes—eventually agree on sets of transactions. Each transaction on the network costs a small fee: 10000 stroops (0.001 <abbr title="Lumens">RIA</abbr>). This fee helps prevent bad actors from spamming the network.

To help you test your tools and applications, Triam.org operates a small test network and Horizon instance. [Get started with the testnet.](../concepts/test-net.md)


## :sparkles: New features in core v2 :sparkles:

At this time, we are customizing token fee at application layer that allows an exchange to has token fee. A holding fee wallet will be received this fee and the source account will lost corresponding. Triam network hasn't this feature. But, at this vervion, we implemented it. This makes it not only easy for developing the bussinesses of third parties but also attracts more users to join Triam network. View [more](docs/new_features_in_version2.md). <br>

We have some of [concepts](docs/guides/concepts/new-concepts-v2.md) you need to know before making an example about triam-core v2. 


**How to migrate your existing system from TriamNetwork v1 to v2?**

- Custom Assets in v2 : We also have made an example for you to know the follow of new features. Let's have a look on [Custom Assets on version 2](docs/guides/walk-throughs/custom-assets-v2.md)
