# Cloudflare to S3

## Bucket/redirection

Create bucket using your domain/subdomain for name (if you're using domain aliases you also need to create buckets for subdomains and redirect them).

Check [this](https://support.cloudflare.com/hc/en-us/articles/360037983412-Configuring-an-Amazon-Web-Services-static-site-to-use-Cloudflare) instruction for more.

**Attention!** Please remember to mark your bucket public.

## Policy

Add a policy to allow you to change bucket settings.

## Add CF config to the bucket

In bucket's privileges tab edit policy and add Cloudflare config:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::develop.memocracy.eu/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": [
            "2400:cb00::/32",
            "2606:4700::/32",
            "2803:f800::/32",
            "2405:b500::/32",
            "2405:8100::/32",
            "2a06:98c0::/29",
            "2c0f:f248::/32",
            "173.245.48.0/20",
            "103.21.244.0/22",
            "103.22.200.0/22",
            "103.31.4.0/22",
            "141.101.64.0/18",
            "108.162.192.0/18",
            "190.93.240.0/20",
            "188.114.96.0/20",
            "197.234.240.0/22",
            "198.41.128.0/17",
            "162.158.0.0/15",
            "172.64.0.0/13",
            "131.0.72.0/22",
            "104.16.0.0/13",
            "104.24.0.0/14"
          ]
        }
      }
    }
  ]
}
```

## Add records to CF

Add `cname` pointing to your S3 endpoint. Remember to enable static hosting on bucket's properties!

## Allow iam to access S3 (deployment)

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