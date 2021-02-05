<?php

use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

if (! function_exists('mix')) {
    /**
     * Get the path to a versioned Mix file.
     *
     * @param  string  $path
     * @param  string  $manifestDirectory
     * @return \Illuminate\Support\HtmlString
     *
     * @throws \Exception
     */
    function mix($path, $manifestDirectory = '')
    {
        static $manifests = [];
        if (! Str::startsWith($path, '/')) {
            $path = "/{$path}";
        }

        if ($manifestDirectory && ! Str::startsWith($manifestDirectory, '/')) {
            $manifestDirectory = "/{$manifestDirectory}";
        }

        $manifestPath = $_SERVER['DOCUMENT_ROOT'] . $manifestDirectory.'/mix-manifest.json';
        if (! isset($manifests[$manifestPath])) {
            if (! file_exists($manifestPath)) {
                throw new Exception('The Mix manifest does not exist.');
            }
            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifests[$manifestPath];
        if (! isset($manifest[$path])) {
            new Exception("Unable to locate Mix file: {$path}.");
            return $path;
        }
        return new HtmlString($manifestDirectory.$manifest[$path]);
    }
}
