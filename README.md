# PLEASE READ THIS
# 22.01.2022 - last update, should be fully usable
The provided application is very bare bones, as many of the used services are 1NCE specific, like
<ol>
    <li> SSO login for company users</li>
    <li> Various API integrations </li>
    <li> VPC & integration</li>
    <li> ..and many more</li>
</ol>


**LAST UPDATED 20.01.2022** 
Its a hassle to check everything on on-demand deployments, so I will update this as time goes by to get everything working ! <br>
tis is no way production ready code, just a
**BARE BONES DEMO**
<p>
Why BARE BONES, honestly it would take a lot of time & personal cost (aws cloud bill) to setup all the necessary services, like VPC, Secret Managers
and so on...  <br>

Thus, if you would like to see the full demo please reach out to me directly and I will show you around on companies expense :).

</p>
# How to run it your self?

<p>
Please be aware that this will take some time .....  <br>

First of all you need and AWS account,if you dont have one please go [Here](https://aws.amazon.com/resources/create-account/)    <br>

Then do fallowing ->
</p>
<ol> 
    <li> Head over to IAM (search via aws console IAM) </li>
    <li> Go to USERS and create a user. It  needs to be Access key - Programmatic access </li>
    <li> For the sake of simplicity give user all access -  **Give user AdministratorAccess**</li>
    <li> Copy users access key  & access key secrets - this will be needed for terraform </lo>
</ol>

Once that is done, you need familiarize with [Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

## Monitoring part, lets get that up and running :)



<p>
Access "web_probes" directory and do fallowing -> <br>
Add credentials to terraform.tfvars and run *terraform init*   <br>
Run *terraform plan* and check if all is good (+1)  (it should be). <br>
 *tho s3 bucket name are unique in globe if you get an error bucket exists go to s3-bucket.tf and change Bucket attribute". <br>


terraform.tfvars add your "estudijas" username and password to run automated test that check if you can login into estudijas 

Run *terraform apply* enter yes and wait  <br>

Now basic monitoring app should be in your cloud :). <br>

Head over to AWS Lambdas and search for lambda that ends with state_machine_maker (default = your-monitoring-framework-state_machine_maker). <br>
Lets waste no time and try to test some samples   <br>
click test. <br>
create any test event. <br>
you should receive results INFO UPDATE SUCCESSFUL. <br>

Check DynamoDB head over to DynamoDB, select the (default = prod-your-monitoring-framework-table) table and see items with PK config. <br>

Head over to AWS Lambdas and search for lambda that ends with run_tests (default = prod-your-monitoring-framework-run_tests). <br>
create any test event. <br>
you should receive results INFO	TEST STARTED. <br>

Now you can head over to AWS StepFunctions and see the results. <br>

I think this would suffice for an monitoring demo.  <br>
**RUN TERRAFORM DESTROY AFTERWARDS TO AVOID COSTS** 

## Lets Boot up the client app

To get the Client app working locally you need to do the fallowing:
<ol>
<li> in AWS Console search api gateway</li>
<li> go to your api  (default = your-monitoring-framework-api) </li>
<li> copy Invoke url attribute from Stages block</li>
<li> open projects ui directory</li>
<li> open package.json </lo>
<li> replace YOURAPI with copied string</li>
<li> open directory in terminal and run  </li>
<li> npm install</li>
<li> npm run local </li>
</ol>

Go to webprobes - and click re-build solution
The when you clikc "run monitoring" it will execute a single defined test which you can later observe

And you should be able to play around!





