# S3 hosting

Create a bucket and set it up in properties to host static website.

Please remember to allow deploy iam:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:ListAllMyBuckets"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::develop.memocracy.eu"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:GetBucketLocation",
                "s3:PutBucketWebsite"
            ],
            "Resource": [
                "arn:aws:s3:::develop.memocracy.eu/*",
                "arn:aws:s3:::develop.memocracy.eu"
            ]
        }
    ]
}
```