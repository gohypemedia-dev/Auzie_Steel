import urllib.request, os

images_to_download = [
    # Industries
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/projects/distribution-warehouse/VP_Industry_warehouse_H.jpg", "public/industry-warehouse.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/projects/hangars-aviation/VP_Industry_hangar_H.jpg", "public/industry-hangars.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/projects/sports-recreation/VP_Industry_sports-rec_H.jpg", "public/industry-sports.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/projects/breweries-wineries/VP_Industry_breweries_H.jpg", "public/industry-breweries.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/projects/retail-dining/VP_Industry_retail_H.jpg", "public/industry-retail.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/projects/education/VP_Industry_education_H.jpg", "public/industry-education.jpg"),
    # Testimonial builders
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/employees/builderheadshots/VP_AmmonBingham.jpg", "public/builder-ammon-bingham.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/employees/builderheadshots/VP_RyanKlosterman.jpg", "public/builder-ryan-klosterman.jpg"),
    ("https://varcopruden.com/content/dam/north-america/bbna-assets/varco-pruden/images/employees/builderheadshots/VP_DavidDeMaio.jpg", "public/builder-david-demaio.jpg"),
]

for url, local_path in images_to_download:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(local_path, 'wb') as f:
                f.write(data)
            print(f'Successfully downloaded {local_path} ({len(data)} bytes)')
    except Exception as e:
        print(f'Failed {url}: {e}')

