# Copy needed files to temp directory
rsync -avz --exclude '*.js' --exclude '*.css' --exclude '*.map' dist tmp

# Remove .gz extensions
for x in $(find tmp -name \*.gz); do
  mv $x $(echo "$x" | sed 's/\.gz$//')
done

echo "Cleaning bucket"
aws s3 rm s3://$BUCKET --recursive
echo "Uploading files"
aws s3 sync tmp/dist s3://$BUCKET --acl public-read
echo "Set headers on files"
aws s3 cp --recursive s3://$BUCKET/js s3://$BUCKET/js --metadata-directive REPLACE --content-encoding 'gzip' --cache-control 'max-age=86400'
aws s3 cp --recursive s3://$BUCKET/css s3://$BUCKET/css --metadata-directive REPLACE --content-encoding 'gzip' --cache-control 'max-age=86400'
aws s3 cp --recursive s3://$BUCKET/img s3://$BUCKET/img --metadata-directive REPLACE --cache-control 'max-age=604800'

echo "Cleaning up temporary folder"
rm -r tmp